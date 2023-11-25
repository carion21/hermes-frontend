class ElementSidebare {

  static nouveauElement(texte, route, template, icone, active) {

    var nouveau = {
      texte: texte,
      route: route,
      template: template,
      icone: icone,
      active: active
    }

    return nouveau

  }
}

module.exports = ElementSidebare