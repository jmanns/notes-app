import { Meteor } from 'meteor/meteor'
import expect from 'expect'

import { validateNewUser } from './users'

if (Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [{
          address: 'jason@gmail.com'
        }]
      }
      expect(validateNewUser(testUser)).toBe(true)
    })

    it('should reject invalid email address', function () {
      const testUser = {
        emails: [{
          address: 'jason.gmail.com'
        }]
      }
      expect(() => {
        validateNewUser(testUser)
      }).toThrow()
    })

  })
}
