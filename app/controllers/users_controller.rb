class UsersController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }

  def index
    @users = User.all
  end

  def new
  end

  def create
    user = User.new(user_params)
    if user.save
      redirect_to root_path, notice: "Welcome to Railsnew!"
    else
      logger.debug "Flash notice: #{flash[:notice]}"
      logger.debug "Flash alert: #{flash[:alert]}"
      render :new, alert: "Try another email address or password."

    end
  end

  private

  def user_params
    params.permit(:email_address, :password, :password_confirmation, :name, :surname, :username)
  end
end
