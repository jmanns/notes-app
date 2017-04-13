import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { Notes } from './notes'

if (Meteor.isServer) {
  describe('notes', function () {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My title',
      body: 'My body for note',
      updatedAt: 0,
      userId : 'testUserId1'
    }
    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to study',
      body: 'HTML5, CSS3 & JS',
      updatedAt: 0,
      userId : 'testUserId2'
    }

    beforeEach(function () {
      Notes.remove({})
      Notes.insert(noteOne)
      Notes.insert(noteTwo)
    })

    it('should insert new note', function () {
      const userId = 'testId'
      const _documentId = Meteor.server.method_handlers['notes.insert'].apply({ userId: userId })

      expect(Notes.findOne({ _id: _documentId, userId: userId })).toExist()
      
    })

    it('should not insert note if not authenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']()
      }).toThrow()
    })

    it('should remove a note', function () {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id])
      expect(Notes.findOne({ _id: noteOne._id })).toNotExist()
    })

    it('should not remove note if unathenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).toThrow()
    })

    it('should not remove note if invalid id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId })
      }).toThrow()
    })

    it('should update note', function () {
      const title = 'Updated title'
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [ 
        noteOne._id, 
        { title }
      ])

      const note = Notes.findOne(noteOne._id)
      expect(note.updatedAt).toBeGreaterThan(0)
      expect(note).toInclude({
        title,
        body: noteOne.body
      })
    })

    it('should throw error if extra updates', function () {
      const title = 'Updated title'
      const body = 'Updated body'
      const mal = 'Malicious code on object'

      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { title, body, mal }
        ])
      }).toThrow()
    })

    it('should not update note if user was not creator', function () {
      const title = 'Updated title'
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testid'
      }, [ 
        noteOne._id, 
        { title }
      ])

      const note = Notes.findOne(noteOne._id)
      expect(note).toInclude(noteOne)
    })

    it('should not udpade note if unathenticated', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id, { title: 'Updated title' }])
      }).toThrow()
    })

    it('should not update note if invalid id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId })
      }).toThrow()
    })

    it('should return a users notes', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId })
      // res is a cursor so fetch is needed to get the users notes
      const notes = res.fetch()

      expect(notes.length).toBe(1)
      expect(notes[0]).toEqual(noteOne)
    })

    it('should return zero notes if user has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: '12345'})
      const notes = res.fetch()

      expect(notes.length).toBe(0)
    })

  })
}
