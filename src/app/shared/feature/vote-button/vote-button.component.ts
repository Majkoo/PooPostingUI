import {Component, EventEmitter, Input, Output} from '@angular/core';
import {VoteType} from "../../utility/enums/voteType";
import {LikeState} from "../../utility/enums/likeState";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent  {

  @Output() voted = new EventEmitter<VoteType>();
  @Input() voteType = VoteType.LIKE;
  @Input() likeState = LikeState.LIKED;
  @Input() isLoggedOn = false;
  @Input() likeCount = 0;
  @Input() dislikeCount = 0;

  vote() {
    this.voted.emit(this.voteType);
  }

}
