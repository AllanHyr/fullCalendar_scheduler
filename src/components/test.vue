const ressources = [ { "id": 1, "title": "Batiment A", "key": "0" }, { "id": 1,
"title": "Salle A", "key": "0-0" }, { "id": 1, "title": "Piece A", "key":
"0-0-0" }, { "id": 2, "title": "Piece B", "key": "0-0-1" }, { "id": 2, "title":
"Salle B", "key": "0-1" }, { "id": 3, "title": "Piece A", "key": "0-1-0" }, {
"id": 4, "title": "Piece B", "key": "0-1-1" }, { "id": 5, "title": "Piece C",
"key": "0-1-2" }, { "id": 3, "title": "Salle C", "key": "0-2" }, { "id": 6,
"title": "Piece A", "key": "0-2-0" }, { "id": 4, "title": "Salle D", "key":
"0-3" }, { "id": 7, "title": "Piece A", "key": "0-3-0" }, { "id": 2, "title":
"Batiment B", "key": "1" }, { "id": 5, "title": "Salle E", "key": "1-0" }, {
"id": 8, "title": "Piece A", "key": "1-0-0" }, { "id": 9, "title": "Piece B",
"key": "1-0-1" }, { "id": 10, "title": "Piece C", "key": "1-0-2" }, { "id": 11,
"title": "Piece D", "key": "1-0-3" }, { "id": 6, "title": "Salle F", "key":
"1-1" }, { "id": 12, "title": "Piece A", "key": "1-1-0" }, { "id": 13, "title":
"Piece B", "key": "1-1-1" }, { "id": 3, "title": "Batiment C", "key": "2" }, {
"id": 7, "title": "Salle G", "key": "2-0" }, { "id": 14, "title": "Piece A",
"key": "2-0-0" }, { "id": 15, "title": "Piece B", "key": "2-0-1" }, { "id": 4,
"title": "Batiment D", "key": "3" }, { "id": 8, "title": "Salle H", "key": "3-0"
}, { "id": 16, "title": "Piece A", "key": "3-0-0" }, { "id": 9, "title": "Salle
I", "key": "3-1" }, { "id": 17, "title": "Piece A", "key": "3-1-0" }, { "id":
18, "title": "Piece B", "key": "3-1-1" }, { "id": 19, "title": "Piece C", "key":
"3-1-2" }, { "id": 10, "title": "Salle J", "key": "3-2" }, { "id": 20, "title":
"Piece A", "key": "3-2-0" } ]; const array = [] const nbRessources = 3;
ressources.forEach((ressource) => { const keySplit = ressource.key.split('-');
for (let i = 1; i <= nbRessources; i++) { if (keySplit.length === i && i !==
nbRessources) { array.push({ id: ressource.id, title: ressource.title, key:
ressource.key, }); } } }); console.log(array);
