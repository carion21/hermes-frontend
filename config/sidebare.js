class Sidebare {

    constructor(args) {
      // code
    }
  
    /**
     * 
     * @param {entier} lengthtab 
     * @param {entier} position 
     */
    static activeSidebare(tabSidebar, position) {
  
      if (position <= tabSidebar.length - 1) {
        for (let index = 0; index < tabSidebar.length; index++) {
          if (index == position) {
            tabSidebar[index].active = 1
          } else {
            tabSidebar[index].active = 0
          }
        }
      }
  
      /*
      console.log("================================================================================")
     console.log(tabSidebar[position])
      console.log("================================================================================")
      */
  
      return tabSidebar
    }
  
    static getIndice(tabSidebar, template) {
      let indice = tabSidebar.findIndex(element => element.template.includes(template))
      // let indice = tabSidebar.findIndex(element => element.template == template)
      return indice
    }
  }
  
  module.exports = Sidebare