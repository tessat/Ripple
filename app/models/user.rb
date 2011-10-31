class User < ActiveRecord::Base
  
  # Class methods
  
  class << self
    
    def find_or_create_with_omniauth(auth)
      user = User.find_by_provider_and_uid(auth["provider"], auth["uid"]) || create_with_omniauth(auth)
      # Update user if necessary
      if ((user.name != auth["user_info"]["name"]) || (user.access_token != auth["credentials"]["token"]))
        user.name = auth["user_info"]["name"]
        user.access_token = auth["credentials"]["token"]
        user.save!
      end
      return user
    end

    private
    
    def create_with_omniauth(auth)
      create! do |user|
        user.uid = auth["uid"]
        user.name = auth["user_info"]["name"]
        user.provider = auth["provider"]
        user.access_token = auth["credentials"]["token"]
      end
    end
    
  end
  
  # Non-class methods
  
  def foursquare_user
    @foursquare_user ||= foursquare.users.find(self.uid)
  end
  
  private
  
  def foursquare
    @foursquare ||= Foursquare::Base.new(self.access_token)
  end
  
end
