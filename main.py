# Copyright 2013 Google, Inc
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#             http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import json

import modelCourse as model

import webapp2
from google.appengine.api import users

def AsDict(course):
    
    return {
        
        'author': course.author.email(),
        'name': course.name,
        'description': course.description,
        'lang': course.lang

    }


class RestHandler(webapp2.RequestHandler):

    def dispatch(self):
        # time.sleep(1)
        super(RestHandler, self).dispatch()

    def SendJson(self, r):
        self.response.headers['content-type'] = 'text/plain'
        self.response.write(json.dumps(r))


class QueryHandler(RestHandler):

    def get(self):
        courses = model.All()
        r = [AsDict(course) for course in courses]
        self.SendJson(r)


class UpdateHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        guest = model.UpdateGuest(r['name'], r['first'], r['last'])
        r = AsDict(guest)
        self.SendJson(r)


class InsertHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        course = model.Insert(r['name'], r['description'], r['lang'])
        r = AsDict(course)
        self.SendJson(r)


class DeleteHandler(RestHandler):

    def post(self):
        r = json.loads(self.request.body)
        model.DeleteGuest(r['id'])

class GetUser(RestHandler):

    def get(self):
        user = users.get_current_user()
        if user:
            email = user.email()
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            email = ''
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'
        r = {'user': email, 'url': url, 'url_linktext': url_linktext}
        self.SendJson(r)

APP = webapp2.WSGIApplication([
    ('/rest/query', QueryHandler),
    ('/rest/insert', InsertHandler),
    ('/rest/delete', DeleteHandler),
    ('/rest/update', UpdateHandler),
    ('/rest/user', GetUser),
], debug=True)
