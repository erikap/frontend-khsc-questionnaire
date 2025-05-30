import EmberRouter from '@ember/routing/router';
import config from 'frontend-khsc-questionnaire/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('intro');
  this.route('where');
  this.route('what');
  this.route('youth');
  this.route('memories');
  this.route('cost');
  this.route('form');
});
