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