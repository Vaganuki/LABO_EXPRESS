INSERT INTO categories (name) VALUES
('Friday Night Magic'),
('Prerelease'),
('Pro Tour Qualifier'),
('Pro Tour'),
('Regional Championship Qualifier'),
('Regional Championship'),
('World Championship'),
('Side Events'),
('Gateway'),
('Grand Prix');

INSERT INTO formats (name) VALUES
('Vintage'),
('Legacy'),
('Modern'),
('Pioneer'),
('Standard'),
('Commander'),
('Duel Commander'),
('Pauper'),
('Scellé'),
('Draft');

INSERT INTO users (nom, prenom, mail, mdp, ddn) VALUES ('admin',' ', 'admin@thisapp.app', 'admin', '2000-06-29');

-- Insertion des événements MTG
INSERT INTO events (name, description, places_count, id_categorie, id_format, image, date_debut, date_fin, annulation, id_createur)
VALUES
('Friday Night Magic - Bruxelles', 'Événement hebdomadaire de Magic: The Gathering pour les joueurs de Bruxelles.', 50, 1, 5, '', '2025-03-20', '2025-03-20', false, 1),
('Pré-lancement de l''extension "Phantom Menace"', 'Événement spécial pour découvrir en avant-première la nouvelle extension.', 100, 2, 9, 'pre_release_phantom_menace.jpg', '2025-03-27', '2025-03-29', false, 1),
('Qualificateur Pro Tour - Paris', 'Tournoi qualificatif pour le Pro Tour à Paris, format Modern.', 128, 3, 3, 'ptq_paris.jpg', '2025-04-10', '2025-04-11', false, 1),
('Pro Tour - Londres', 'Compétition de haut niveau réunissant les meilleurs joueurs mondiaux, format Standard.', 256, 4, 5, 'pro_tour_london.jpg', '2025-05-15', '2025-05-17', false, 1),
('Qualificateur Championnat Régional - Madrid', 'Tournoi pour se qualifier au Championnat Régional de Madrid, format Pioneer.', 64, 5, 4, 'rcq_madrid.jpg', '2025-06-05', '2025-06-06', false, 1),
('Championnat Régional - Madrid', 'Compétition régionale réunissant les meilleurs joueurs d''Europe, format Pioneer.', 512, 6, 4, 'regional_champ_madrid.jpg', '2025-06-12', '2025-06-14', false, 1),
('Championnat du Monde - Tokyo', 'Le summum de la compétition MTG, avec des joueurs du monde entier, format Commander.', 16, 7, 6, 'world_champ_tokyo.jpg', '2025-07-20', '2025-07-22', false, 1),
('Grand Prix - Barcelone', 'Grand tournoi ouvert à tous les niveaux, format Pauper.', 1024, 8, 8, 'gp_barcelona.jpg', '2025-08-05', '2025-08-07', false, 1),
('Gateway Tournament - Amsterdam', 'Tournoi d''introduction pour les nouveaux joueurs, format Scellé.', 32, 9, 9, 'gateway_amsterdam.jpg', '2025-09-10', '2025-09-10', false, 1),
('Friday Night Magic - Liège', 'Événement hebdomadaire de Magic: The Gathering pour les joueurs de Liège.', 50, 1, 5, 'fmn_liege.jpg', '2025-09-17', '2025-09-17', false, 1);

-- Insertion de plusieurs événements Magic: The Gathering
INSERT INTO events (name, description, places_count, id_categorie, id_format, image, date_debut, date_fin, annulation, id_createur)
VALUES
-- Tournoi Prerelease Modern Horizons 2
('Tournoi Prerelease Modern Horizons 2', 'Événement de lancement pour le set Modern Horizons 2.', 64, 2, 5, 'image_prerelease_mh2.jpg', '2024-05-29', '2024-05-30', false, 1),
-- Grand Prix Paris 2024
('Grand Prix Paris 2024', 'Tournoi majeur de Magic à Paris.', 512, 6, 5, 'image_gp_paris_2024.jpg', '2024-06-15', '2024-06-17', false, 1),
-- Championnat du Monde 2024
('Championnat du Monde 2024', 'Compétition mondiale réunissant les meilleurs joueurs de Magic.', 128, 7, 5, 'image_worlds_2024.jpg', '2024-10-20', '2024-10-22', false, 1),
-- Tournoi Side Event Pro Tour 2024
('Side Event Pro Tour 2024', 'Événements parallèles lors du Pro Tour 2024.', 256, 8, 5, 'image_side_event_pt_2024.jpg', '2024-08-10', '2024-08-12', false, 1),
-- Tournoi Gateway 2024
('Tournoi Gateway 2024', 'Compétition régionale pour les joueurs de Magic.', 128, 9, 5, 'image_gateway_2024.jpg', '2024-07-05', '2024-07-06', false, 1),
-- Tournoi Friday Night Magic Bruxelles
('Friday Night Magic Bruxelles', 'Événements hebdomadaires pour les joueurs de Magic à Bruxelles.', 32, 1, 5, 'image_fnm_brussels.jpg', '2024-03-07', '2024-03-07', false, 1),
-- Tournoi Prerelease Theros: Beyond Death
('Tournoi Prerelease Theros: Beyond Death', 'Événement de lancement pour le set Theros: Beyond Death.', 64, 2, 5, 'image_prerelease_theros.jpg', '2024-01-18', '2024-01-19', false, 1),
-- Grand Prix Lyon 2024
('Grand Prix Lyon 2024', 'Tournoi majeur de Magic à Lyon.', 512, 6, 5, 'image_gp_lyon_2024.jpg', '2024-04-25', '2024-04-27', false, 1),
-- Championnat Européen 2024
('Championnat Européen 2024', 'Compétition réunissant les meilleurs joueurs européens de Magic.', 128, 7, 5, 'image_european_championship_2024.jpg', '2024-09-15', '2024-09-17', false, 1),
-- Tournoi Pauper Bruxelles
('Tournoi Pauper Bruxelles', 'Compétition pour les joueurs de Pauper à Bruxelles.', 64, 1, 8, 'image_pauper_brussels.jpg', '2024-05-10', '2024-05-10', false, 1);

DROP TABLE categories, events, formats, inscriptions, users;