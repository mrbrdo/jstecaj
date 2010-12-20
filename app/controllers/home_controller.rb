class HomeController < ApplicationController
  def login
    if params[:user]
      session[:user] = User.find_or_create_by_username(params[:user]).id
    
      respond_to do |format|
        format.html { redirect_to pages_url }
        format.json  { render :json => "OK".to_json, :callback => params[:callback] }
      end
    else
      respond_to do |format|
        format.html
      end
    end
  end

end
