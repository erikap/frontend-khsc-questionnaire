import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';

export default class FormController extends Controller {
  @service store;

  willJoinOptions = [
    { label: 'Ja', value: 'yes' },
    { label: 'Nee', value: 'no' },
  ];

  personFields = [
    { label: 'Volwassenen', attribute: 'nbOfAdults' },
    { label: 'Kinderen bij JeeCee<br><span class="text-xs">(vanaf geboortejaar 2021)</span>', attribute: 'nbOfJeecee' },
    { label: 'Kinderen niet bij JeeCee', attribute: 'nbOfNotJeecee' },
  ];

  @tracked name;
  @tracked willJoin;
  @tracked nbOfAdults = 0;
  @tracked nbOfJeecee = 0;
  @tracked nbOfNotJeecee = 0;
  @tracked reasonNotInterested;
  @tracked submission;

  get showForm() {
    return this.willJoin == "yes";
  }

  get isNotInterested() {
    return this.willJoin == "no";
  }

  get isValid() {
    return isPresent(this.willJoin);
  }

  get isSubmitting() {
    return this.submission && this.submission.isNew;
  }

  get isSubmitted() {
    return this.submission?.id;
  }

  @action
  setName(event) {
    this.name = event.target.value;
  }

  @action
  setNumber(attr, event) {
    this[attr] = event.target.value;
  }

  @action
  setReasonNotInterested(event) {
    this.reasonNotInterested = event.target.value;
  }

  @action
  setWillJoin(event) {
    this.willJoin = event.target.value;
  }

  @action
  async submit(event) {
    event.preventDefault();

    const attributes = this.isNotInterested
      ? { reasonNotInterested: this.reasonNotInterested }
      : { numberOfAdults: this.nbOfAdults, numberOfJeecee: this.nbOfJeecee, numberOfNotJeecee: this.nbOfNotJeecee };

    this.submission = this.store.createRecord('submission', {
      name: this.name,
      created: new Date(),
      isInterested: this.willJoin,
      ...attributes
    });

    await this.submission.save();
  }
}
