import React from 'react'
import { shallow } from 'enzyme'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import App from '../src/App'

const allTechs = ['javascript', 'git', 'jquery', 'sass', 'rails', 'kafka', 'aws', 'graphql', 'bootstrap', 'rust', 'docker', 'redux', 'react native', 'express', 'react', 'vue', 'd3', 'ember', 'django', 'flask', 'sql', 'java', 'c#', 'python', 'php', 'c++', 'c', 'clojure', 'typescript', 'ruby', 'swift', 'objective-c', '.net', 'assembly', 'r', 'perl', 'vba', 'matlab', 'golang', 'scala', 'haskell', 'node', 'angular', '.net core', 'cordova', 'mysql', 'sqlite', 'postgresql', 'mongodb', 'oracle', 'redis', 'html', 'css'].sort();
const userInputData = {
  jobTitle: 'web developer',
  userLocation: 'san francisco',
  userTechnologies: ['css', 'html', 'c++'],
  allTechs: allTechs,
  checked: {
    github:true,
    stackOverflow:false,
    hackerNews:true
  }
};
const wrapper = shallow(<App />);
const mountWrapper = mount(<App />);
const getJobListingsSpy = sinon.spy(App.prototype, "getJobListings");
const handleDescriptionClickSpy = sinon.spy(App.prototype, "handleDescriptionClick");
const showShortDescriptionsSpy = sinon.spy(App.prototype, "showShortDescriptions");
const showFullDescriptionsSpy = sinon.spy(App.prototype, "showFullDescriptions");
const onHideClickSpy = sinon.spy(App.prototype, "onHideClick");

describe('(Component) App', () => {
  it('renders...', () => {
    expect(wrapper).to.have.length(1);
  });

  it('calls handleDescriptionClick when SearchResults.props.descriptionClicked is called', () => {
    wrapper.find('SearchResults').prop('descriptionClicked')();
    expect(handleDescriptionClickSpy.calledOnce);
  });

  it('calls showFullDescriptions when SearchResults.props.fullDescriptionClick is called', () => {
    wrapper.find('SearchResults').prop('onFullDescriptionClick')();
    expect(showFullDescriptionsSpy.calledOnce);
  });

  it('calls showShortDescriptions when SearchResults.props.shortDescriptionClick is called', () => {
    wrapper.find('SearchResults').prop('onShortDescriptionClick')();
    expect(showShortDescriptionsSpy.calledOnce);
  });

  it('calls onHideClick when SearchResults.props.onHideClick is called', () => {
    wrapper.find('SearchResults').prop('onHideClick')();
    expect(onHideClickSpy.calledOnce);
  });

  it('calls getJobListings when user input is submitted', () => {
    wrapper.find('UserInput').simulate('submit', userInputData);
    expect(getJobListingsSpy.calledOnce);
  });

  it('should update state.updateListings.showShortDescriptions to false when "read more" is arg to handleDescriptionClick', () => {
    wrapper.instance().handleDescriptionClick('read more');
    expect(wrapper.state('updateListings').showShortDescriptions).to.equal(false);
  })

  it('should update state.updateListings.showFullDescriptions to false when "read less" is arg to handleDescriptionClick', () => {
    wrapper.instance().handleDescriptionClick('read less');
    expect(wrapper.state('updateListings').showFullDescriptions).to.equal(false);
  })

  it('should update state.updateListings.unhideAll to true when unhideAll is called', () => {
    wrapper.instance().unhideAll();
    expect(wrapper.state('updateListings').unhideAll).to.equal(true);
  })

  // it('should have state.receivedListingData.length > 1 when valid userInputData sent to getJobListings', () => {
  //   mountWrapper.instance().getJobListings(userInputData);
  //   console.log(mountWrapper.state());
  //   expect(mountWrapper.state('receivedListingData').length).to.be.above(1);
  // })
})
