import React from 'react'
import expect from 'expect'
import { Meteor} from 'meteor/meteor'
import { mount } from 'enzyme'

import NoteListItem from './NoteListItem'

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const testNote = {
        title: 'My note title',
        updatedAt: 1492085773442
      }

      const wrapper = mount( <NoteListItem note={testNote} />)
      const title = wrapper.find('h5').text()
      const timestamp = wrapper.find('p').text()

      expect(title).toBe(testNote.title)
      expect(timestamp).toBe('13/04/17')
    })

    it('should set default title if not title set', function () {
      const wrapper = mount( <NoteListItem note={{ title: '', updatedAt: 1234 }} />)
      const title = wrapper.find('h5').text()

      expect(title).toBe('Untitled note')
    })
  })
}
