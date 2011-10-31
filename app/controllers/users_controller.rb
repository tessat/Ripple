class UsersController < ApplicationController
  
  before_filter :require_login
  
  def checkins
    @checkins ||= current_user.foursquare_user.checkins if current_user

     respond_to do |format|
       format.html  #TODO: redirect
       format.json  { render :json => @checkins }
     end
  end
  
  def friends
    @friends ||= current_user.foursquare_user.friends if current_user

    @friends_data = []

    @friends.each do |friend|
      @friends_data << {
        :friend => friend,
        :last_checkin => friend.last_checkin
      }
    end

     respond_to do |format|
       format.html  #TODO: redirect
       format.json  { render :json => @friends_data }
     end
  end

end
