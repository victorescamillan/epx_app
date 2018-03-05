import { NgModule } from '@angular/core';
import { SearchMembersPipe } from './search-members/search-members';

@NgModule({
	declarations: [SearchMembersPipe],
	imports: [],
	exports: [SearchMembersPipe]
})
export class PipesModule {}
