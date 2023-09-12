/* eslint-disable @typescript-eslint/no-unused-vars */
import {NgModule} from '@angular/core';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {faReact, faAngular} from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faReact, faAngular);
  }
}
