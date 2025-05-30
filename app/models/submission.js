import Model, { attr } from '@ember-data/model';

export default class SubmissionModel extends Model {
  @attr('string') name;
  @attr('date') created;
  @attr('string') isInterested;
  @attr('number') numberOfAdults;
  @attr('number') numberOfJeecee;
  @attr('number') numberOfNotJeecee;
  @attr('string') reasonNotInterested;
}
