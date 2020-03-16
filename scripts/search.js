function liIncludeTxt(li, input) {
  /* Test si l'element de la list contient la chaine de caracteres
    (sans tenir compte de la case et des accents) */
  let link = li.getElementsByTagName("a")[0];
  /* On enleve la case et les accents*/
  input = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let content = link.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return ( content.indexOf(input) != -1);
}

function addParentToProtection(li, protectedList) {
  /* Fonction pour ajouter le li parent du li courant à
   la liste des protégés "protectedList"*/

  let liToProtect = li.parentNode.parentNode; // Le parent a protégé

  // On l'ajoute seulement si ce n'est pas deja
  // un element de la liste des protégés
  if (! protectedList.includes(liToProtect)) {
    protectedList.push(liToProtect);
  }
}


function search() {
  /* Fonction pour effectuer une recherche sur la barre de navigation */
  const nav = document.getElementById("nav-left");
  var input = nav.getElementsByClassName("search")[0].value;

  const classNames = ["tertiary", "secondary", "primary"];
  var protectedLis = [];

  for (let className of classNames) {
    var lisToCheck;
    if (className == classNames[0]) {
      // On test que pour les elements afficher pour le troisieme niveau de liste
      lisToCheck = nav.querySelectorAll(`#display > li`);
    } else {
      lisToCheck = nav.querySelectorAll(`ul.${className} > li`);
    }
    for (let li of lisToCheck) {
      if (protectedLis.includes(li)) {
        // Si le li est protégé
        // On le retire de la liste des protégés
        protectedLis = protectedLis.filter((pLi) => pLi!=li);
        // On ajoute sont parents aux éléments protégés
         // Si ce n'est pas les dernier parents
        if (className != classNames[classNames.length -1]) {
          // On ajoute son element pere aux éléments protégés
          addParentToProtection(li, protectedLis);
        }
        // Et on force l'element à s'afficher;
        li.style.display = "";

      } else if (liIncludeTxt(li, input)) { // Si le texte est compris dans l'element
        // Si ce n'est pas les derniers parents
        if (className != classNames[classNames.length -1]) {
          // On ajoute son element pere aux éléments protégés
          addParentToProtection(li, protectedLis);
        }
        // Et on force l'element à s'afficher;
        li.style.display = "";
      } else { // Dans le cas ou le li n'est ni protégé, ni ne contient le texte:
        // On le supprime
        li.style.display = "none";
      }
    }
  }
}
