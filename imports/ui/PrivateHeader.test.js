import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'

import { PrivateHeader } from './PrivateHeader'

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}} /> )

      const buttonText = wrapper.find('button').text()
      expect(buttonText).toBe('Logout')
    })

    it('should display the props title as h1 text', function () {
      const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() => {}} /> )

      const title = wrapper.find('.header__title').text()
      expect(title).toBe('Test Title')
    })

    it('should call handle logout on click', function () {
      const spy = expect.createSpy()
      const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy} /> )

      wrapper.find('button').simulate('click')
      expect(spy).toHaveBeenCalled()
    })
  })
}
