require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "should get checkins" do
    get :checkins
    assert_response :success
  end

end
