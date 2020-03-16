
function isVisible(el) {
  // Test de si un element est visible a l'ecran
  var rect = el.getBoundingClientRect();
  // On test si les coords du rect sont dans la fenetre, d'apres l'axe x uniquement.
  return ( (rect.top+1 >= 0) && (rect.bottom <= window.innerHeight) );
}

function getLinkFromAnchor(anchor, links) {
  // Recuperer un lien depuis l'id auquelle il refere
  for (let a of links) {
    let i = a.href.indexOf("#");
    let href = a.href.substring(i+1);
    if (href == anchor) {
      return a;
    }
  }
  return null;
}

function removeClassFrom(elements, className) {
  // Retirer les class d'une liste d'element
  for (let el of elements) {
    if ( el.className == className) {
      el.classList.remove(className);
    }
  }
}

function onScroll() {
  const sections = document.getElementsByTagName("section");
  // Liste des liens internes des sections de la page courante.
  const links = document.getElementById("display").getElementsByTagName("a");

  // On cherche a savoir si une section est visible
  for (let s of sections) {
    if ( isVisible(s) ) {
      // Si c'est le cas on recupere le lien menant a cette section
      var li = getLinkFromAnchor(s.id, links);
      if (li != null) {
        // On reinitialise les autres liens
        removeClassFrom(links, "selected");
        // puis on change sa classe
        li.classList.toggle("selected");
        break;
      }
    }
  }
}
