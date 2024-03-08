
function addComment(inputId, commentSectionId) {
    // Récupérez la valeur du commentaire
    var comment = document.getElementById(inputId).value;

    // Créez un nouvel élément de paragraphe pour le commentaire
    var newComment = document.createElement('p');
    newComment.textContent = comment;

    // Ajoutez le nouveau commentaire à la section des commentaires
    document.getElementById(commentSectionId).appendChild(newComment);

    // Réinitialisez la valeur de l'élément de saisie du commentaire
    document.getElementById(inputId).value = '';
}

// JavaScript
document.getElementById('post-form').addEventListener('submit', function(event) {
    // Empêcher le rechargement de la page
    event.preventDefault();

    // Récupérer le titre et l'image de la publication
    var title = document.getElementById('post-title').value;
    var imageFile = document.getElementById('post-image').files[0];

    // Créer un nouvel élément de paragraphe pour le titre
    var newTitle = document.createElement('h2');
    newTitle.textContent = title;

    // Créer un nouvel élément d'image pour l'image
    var newImage = document.createElement('img');
    newImage.alt = title;

    // Créer la section des commentaires
    var commentSection = document.createElement('div');
    commentSection.id = title + '-comments';

    var commentForm = document.createElement('form');
    var commentLabel = document.createElement('label');
    commentLabel.for = title + '-comment';
    commentLabel.textContent = 'Ajouter un commentaire';

    var commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.id = title + '-comment';

    var commentButton = document.createElement('button');
    commentButton.type = 'button';
    commentButton.textContent = 'Soumettre';
    commentButton.onclick = function() { addComment(commentInput.id, commentSection.id); };

    commentForm.appendChild(commentLabel);
    commentForm.appendChild(document.createElement('br'));
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentButton);

    commentSection.appendChild(commentForm);

    // Lire le fichier image et créer une URL pour celui-ci
    var reader = new FileReader();
    reader.onloadend = function() {
        newImage.src = reader.result;

        // Créer un nouvel élément d'article pour la publication
        var newPost = document.createElement('article');
        newPost.appendChild(newTitle);
        newPost.appendChild(newImage);
        newPost.appendChild(commentSection); // Ajouter la section des commentaires

        // Ajouter la nouvelle publication au début de la liste de publications
        document.getElementById('posts').prepend(newPost);
    }
    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    // Réinitialiser les champs de saisie
    document.getElementById('post-title').value = '';
    document.getElementById('post-image').value = '';
});