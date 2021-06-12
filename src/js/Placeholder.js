'use strict';

export default class Placeholder {
  constructor() {
    this.url = 'http://localhost:7070'
    this.itemsContainer = document.getElementById('itemsContainer');
    this.modal = document.querySelector('.mistake');
    this.serviceWorkerRegistration();
    this.drawItems( [] );
    this.getData().then( response => {
      if ( response ) {
        this.drawItems( response );
      }
    });
  }

  serviceWorkerRegistration() {

    if (navigator.serviceWorker) {
      window.addEventListener('load', async () => {
      try {
        await navigator.serviceWorker.register( 'sw.js' );
      } catch ( error ) {
        console.log( error );
      } });
    }
  }

  async getData() {
    let response;
    try {
      response = await fetch( this.url , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ command: 'getData' })
      });
      if ( response.ok ) {
        const responseJSON = await response.json();
        return responseJSON;
      } else {
        alert( "Ошибка HTTP: " + response.status );
      }
    } catch ( error ) {
      this.modal.classList.remove('hidden');
    }
  }

  drawItems( data ) {
    this.itemsContainer.innerHTML = '';
    if ( data.length > 0 ) {
      data.forEach( element => {
        this.itemsContainer.insertAdjacentHTML('beforeend',
          `
            <div class="col d-flex align-items-start">
              <svg class="bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"><use xlink:href="${ element.icon }"/></svg>
              <div>
                <h4 class="fw-bold mb-0">${ element.header }</h4>
                <p class="">${ element.text }</p>
              </div>
            </div>
          `)
      })
    } else {
      let item = 0;
      while ( item < 8 ) {
        this.itemsContainer.insertAdjacentHTML('beforeend',
          `
            <div class="col d-flex align-items-start">
              <svg class="placeholder-content-icon bi text-muted flex-shrink-0 me-3" width="1.75em" height="1.75em"></svg>
              <div>
                <h4 class="placeholder-content-header fw-bold mb-0"></h4>
                <p class="placeholder-content-text"></p>
              </div>
            </div>
          `)
        item++;
      }
    }
  }
}
