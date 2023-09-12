import type {AfterViewInit, OnDestroy, OnInit} from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Component} from '@angular/core';

// Import for icons
import {faReact, faAngular} from '@fortawesome/free-brands-svg-icons';

// Import from .json file for backend endpoints
import configEndpoints from '../assets/configurationEndpoints/configuration.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'sidebar';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonPages: any;

  // Attributes for icons
  reactIcon = faReact;
  angularIcon = faAngular;

  sidebarId = 'sidebar_hidden';

  sidebarButton = () => {
    this.sidebarId === 'sidebar_hidden'
      ? (this.sidebarId = 'sidebar_visible')
      : (this.sidebarId = 'sidebar_hidden');
  };

  ngOnInit(): void {
    // Listener to set the sidebar id correctly to open or close the sidebar
    window.addEventListener('sidebarButton', this.sidebarButton);
  }

  // After Angular has fully initialized the sidebar view, I dynamically put pages into the sidebar
  ngAfterViewInit(): void {
    fetch(configEndpoints.sidebarConfig)
      .then(response => response.json())
      .then(jsonData => {
        // jsonData is parsed json object received from url
        this.jsonPages = jsonData;
        this.getDynamicPageSection();
      })
      .catch(error => {
        // handle errors here
        console.error(error);
      });
  }

  ngOnDestroy(): void {
    // Remove the listener to set the sidebar id correctly to open or close the sidebar
    window.removeEventListener('sidebarButton', this.sidebarButton);
  }

  getDynamicPageSection(): void {
    // If there are no sections (and therefore no pages) in the .json file, nothing is inserted in the sidebar
    if (this.jsonPages.sectionsNum < 1) return;

    const pageLinksDiv = document.getElementById('pageLinks') as HTMLElement;
    // Reading of the .json file and relative formatting of the links of the pages inserted in the sidebar
    let page: HTMLAnchorElement;
    let section;
    let currSectionNum = 0;
    // To iterate through sections in the .json file
    for (let i = 0; i < this.jsonPages.sectionsNum; i++) {
      section = this.jsonPages.sections[i];
      if (section.length > 0) {
        // For each page within the sections...
        for (let j = 0; j < section.length; j++) {
          // Creation of the html elements and the relative style for the links of the pages in the sidebar
          page = document.createElement('a');
          page.className = 'pageLinks';
          page.href = section[j].link;
          page.innerHTML = section[j].name;
          page.style.padding = '12px 16px 12px 16px';
          page.style.textDecoration = 'none';
          page.style.color = 'white';
          page.style.display = 'block';
          pageLinksDiv.appendChild(page);
        }
      }

      // To insert the separation lines between the sections in the sidebar
      if (currSectionNum < section.length - 1) {
        // Creation of the html element 'hr' and related style
        const dividingLine = document.createElement('hr');
        dividingLine.style.borderTop = '1px solid #737373';
        dividingLine.style.borderBottom = '1px solid #737373';
        pageLinksDiv.appendChild(dividingLine);
      }
      currSectionNum++;
    }

    // To set the onmouseover and onmouseleave events for each sidebar page
    const pageLinksList = document.getElementsByClassName(
      'pageLinks'
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < pageLinksList.length; i++) {
      pageLinksList[i].onclick = () => {
        /* After 25 milliseconds (to allow the sidebar closing animation to be displayed)
        the EventListener is called to close the sidebar */
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('sidebarButton'));
        }, 25);
      };
      pageLinksList[i].onmouseover = () =>
        (pageLinksList[i].style.color = '#b3b3b3');
      pageLinksList[i].onmouseleave = () =>
        (pageLinksList[i].style.color = 'white');
    }
  }
}
