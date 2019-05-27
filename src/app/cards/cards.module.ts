import { CardsComponent } from './cards.component';
import { ContactCardComponent } from '@app/cards/contact-card/contact-card.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { SkillsCardComponent } from './skills-card/skills-card.component';
import { EducationCardComponent } from './education-card/education-card.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule],
  declarations: [CardsComponent, ContactCardComponent, SkillsCardComponent, EducationCardComponent],
  exports: [CardsComponent],
  providers: []
})
export class CardsModule {}
