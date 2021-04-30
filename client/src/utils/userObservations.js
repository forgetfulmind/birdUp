export function getObservations() {
    return fetch('http://localhost:3333/userObservations')
      .then(data => data.json())
}