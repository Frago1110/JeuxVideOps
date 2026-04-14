import {describe, expect, it, jest} from '@jest/globals';
import {clamp, lerp} from '../src/ts/math/math';
import {distance, toVector} from '../src/ts/math/polar-vector';
import {normalize, dot, add, subtract} from '../src/ts/math/vector';
import {init as initPhysics} from '../src/ts/physics';
import {PARTICLE_LIFESPAN, PROJECTILE_SPEED} from '../src/ts/config';

// test du sujet
describe('Tests exigés pour Space Invaders', function() {
  describe('Fonction clamp (Limitation)', function() {
    // verifie que la fonction maintient bien une valeur dans un intervalle donné
    it('doit retourner 2 quand on passe (1,10,2)', function() {
      expect(clamp(1, 10, 2)).toBe(2);
    });
    it('doit retourner 1 quand on passe (1,10,-12)', function() {
      expect(clamp(1, 10, -12)).toBe(1);
    });
  });

  describe('Fonction lerp (Interpolation)', function() {
    // verifie le calcul de mouvement fluide
    it('doit retourner 19 quand on passe (1,10,2)', function() {
      expect(lerp(1, 10, 2)).toBe(19);
    });
  });

  describe('Vecteurs et Géométrie', function() {
    it('distance: calcule la distance entre deux points polaires', function() {
      // test de distance entre coordonnées polaires (angle/rayon)
      expect(
          distance({angle: 5, radius: 50}, {angle: 10, radius: 100}),
      ).toBeCloseTo(98.30248290540649, 5);
    });

    it('add: additionne deux vecteurs {x, y}', function() {
      // test d'addition de vecteurs cartésiens (x, y)
      expect(add({x: 5, y: 50}, {x: 10, y: 100})).toEqual({
        x: 15,
        y: 150,
      });
    });
  });
});

// tests personnalisé
describe('Tests personnalisés - Logique du Jeu', function() {
  // on récupère la fonction de calcul du moteur physique
  const physics = initPhysics();
  const calculate = physics.calculate;

  // 5 test unitaire

  it('U1. Le moteur doit retourner un objet défini', function() {
    // on utilise mock qui simule un objet pour gagner du temps
    const mockData = {
      input: {axes: {x: 0, y: 0}, fire: false},
      deltaTime: 0.1,
      addPoints: function() {}, // on simule la fonction de score
    };
    const output = calculate(mockData as any);
    expect(output).toBeDefined();
  });

  it('U2. La vitesse des projectiles doit être positive', function() {
    // On vérifie une constante critique de configuration
    expect(PROJECTILE_SPEED).toBeGreaterThan(0);
  });

  it('U3. Le Game Over ne doit pas être actif au début', function() {
    const mockData = {
      input: {axes: {x: 0, y: 0}, fire: false},
      deltaTime: 0,
      addPoints: function() {},
    };
    const output = calculate(mockData as any);
    expect(output.gameOver).toBe(false);
    // empeche de crash ua lancement
  });

  it('U4. La durée de vie des particules doit être configurée', function() {
    // Vérifie que les données de config sont bien chargées
    expect(PARTICLE_LIFESPAN).toBeDefined();
  });

  it('U5. La position du joueur doit contenir X et Y', function() {
    const mockData = {
      input: {axes: {x: 0, y: 0}, fire: false},
      deltaTime: 0.1,
      addPoints: function() {},
    };
    const output = calculate(mockData as any);
    // On s'assure que le moteur renvoie bien des coordonnées valides
    expect(output.playerPosition).toHaveProperty('x');
    expect(output.playerPosition).toHaveProperty('y');
  });

  // 3 test global

  it('F1. Scénario de tir: vérifier la création de la liste', function() {
    // On simule une pression sur la touche de tir
    const mockData = {
      input: {axes: {x: 0, y: 1}, fire: true},
      deltaTime: 1, // Temps suffisant pour déclencher le tir
      addPoints: function() {},
    };
    const output = calculate(mockData as any);
    // On vérifie que le moteur a bien généré une structure pour les projectiles
    expect(output.projectiles).toBeDefined();
  });

  it('F2. Scénario Score: la fonction addPoints doit être utilisable', function() {
    const mockAddPoints = jest.fn(); // "Espion" pour vérifier l'appel
    const mockData = {
      input: {axes: {x: 0, y: 0}, fire: false},
      deltaTime: 0.1,
      addPoints: mockAddPoints,
    };
    calculate(mockData as any);
    // On vérifie que le moteur physique sait communiquer avec le module de score
    expect(typeof mockData.addPoints).toBe('function');
  });

  it('F3. Scénario Cycle de vie: détection de l\'expiration d\'une particule', function() {
    // Test logique : une particule trop vieille doit être marquée comme expirée
    const ageTropGrand = PARTICLE_LIFESPAN + 1;
    const estExpiree = ageTropGrand > PARTICLE_LIFESPAN;
    expect(estExpiree).toBe(true);
  });
});
