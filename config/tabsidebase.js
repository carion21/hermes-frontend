const Sidebare = require('../config/sidebare')
const ElementSidebare = require('../config/element_sidebare')
const { DEFAULT_ROUTE_ADMIN, DEFAULT_ROUTE_OPERATOR } = require('./consts')
const BlocSidebare = require('./bloc_sidebare')


class TabSidebase {

  constructor() {

  }

  /**
   * MENU DU COMPTE ADMIN
   */

  static admin() {
    return [
      BlocSidebare.nouveauBloc(
        "accueil",
        [
          ElementSidebare.nouveauElement("Tableau de bord", DEFAULT_ROUTE_ADMIN + "", "index", "grid", 0)
        ]
      ),
      BlocSidebare.nouveauBloc(
        "gestion stage",
        [
          ElementSidebare.nouveauElement("Liste des stages", DEFAULT_ROUTE_ADMIN + "/stage_management/stage_list", "stage_management/stage_list", "user", 0),
          ElementSidebare.nouveauElement("Nouvelle stage", DEFAULT_ROUTE_ADMIN + "/stage_management/add_stage", "stage_management/add_stage", "user", 0),
        ]
      ),
      BlocSidebare.nouveauBloc(
        "gestion operateur",
        [
          ElementSidebare.nouveauElement("Liste des operateurs", DEFAULT_ROUTE_ADMIN + "/operator_management/operator_list", "operator_management/operator_list", "user", 0),
          ElementSidebare.nouveauElement("Nouvel operateur", DEFAULT_ROUTE_ADMIN + "/operator_management/add_operator", "operator_management/add_operator", "user", 0)
        ]
      ),
      BlocSidebare.nouveauBloc(
        "gestion client",
        [
          ElementSidebare.nouveauElement("Liste des clients", DEFAULT_ROUTE_ADMIN + "/client_management/client_list", "client_management/client_list", "user", 0),
          ElementSidebare.nouveauElement("Nouveau client", DEFAULT_ROUTE_ADMIN + "/client_management/add_client", "client_management/add_client", "user", 0)
        ]
      ),
      BlocSidebare.nouveauBloc(
        "gestion requete",
        [
          ElementSidebare.nouveauElement("Liste des requetes", DEFAULT_ROUTE_ADMIN + "/request_management/request_list", "request_management/request_list", "user", 0)
        ]
      ),
    ]
  }

  /**
   * MENU DU COMPTE OPERATEUR
   */

  static operator() {
    return [
      BlocSidebare.nouveauBloc(
        "accueil",
        [
          ElementSidebare.nouveauElement("Tableau de bord", DEFAULT_ROUTE_OPERATOR + "", "index", "grid", 0)
        ]
      ),
      BlocSidebare.nouveauBloc(
        "gestion requete",
        [
          ElementSidebare.nouveauElement("Liste des requetes", DEFAULT_ROUTE_OPERATOR + "/request_management/request_list", "request_management/request_list", "user", 0)
        ]
      )
    ]
  }



}

module.exports = TabSidebase