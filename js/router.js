export class Router {
  routes = {}

  add(routName, pageLink) {
    this.routes[routName] = pageLink
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
    this.changeBackground()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]

    fetch(route)
      .then((data) => data.text())
      .then((html) => (document.querySelector("#app").innerHTML = html))
  }

  changeBackground() {
    let idBg = window.location.pathname
    const appWrapper = document.querySelector("#app-wrapper")
    appWrapper.className = ""
    idBg = String(idBg).replace("/", "")
    if (idBg.length == 0) {
      appWrapper.className = ""
    } else {
      appWrapper.classList.add(idBg)
    }
  }
}
