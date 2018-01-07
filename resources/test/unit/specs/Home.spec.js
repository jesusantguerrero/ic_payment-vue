import { mount } from 'avoriaz';
import Home from './../../../modules/home/HomeSection';

describe('Hello.vue', () => {
  const HomeComponent = mount(Home);
  it('should render correct contents', () => {
    expect(HomeComponent.find('.section-title')[0].text()).to.equal('Nuevo Usuario');
  });
});
