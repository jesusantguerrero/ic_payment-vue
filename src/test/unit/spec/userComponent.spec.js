import avoriaz from 'avoriaz';
import Vue from 'vue';
import UsersSection from './../../../modules/administrador/';

const admin = `
<div id="administrador"> </div>
`;

document.body.innerHTML = document.body.innerHTML + admin;

describe('UserSection Component', () => {
  beforeEach(() => {

  });

  it('should be mounted', () => {
    const UserSectionComponent = avoriaz.mount(UsersSection);

    const searchBar = UserSectionComponent.find('.search')[0];
    searchBar.trigger('keypress', 'k');
    expect(searchBar.value().to.containe('k'));
  });
});

