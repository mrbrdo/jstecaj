class PagesController < ApplicationController
  # GET /pages
  # GET /pages.xml
  def index
    @pages = current_user.pages.all
    
    @pages_json = []
    @pages.each do |page|
      @pages_json.push({
        :id => page.id,
        :title => page.title
      })
    end

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @pages_json, :callback => params[:callback] }
    end
  end

  # GET /pages/1
  # GET /pages/1.xml
  def show
    @page = current_user.pages.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => @page, :callback => params[:callback] }
    end
  end

  # GET /pages/new
  # GET /pages/new.xml
  def new
    @page = current_user.pages.build

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @page }
    end
  end

  # GET /pages/1/edit
  def edit
    @page = current_user.pages.find(params[:id])
  end

  # POST /pages
  # POST /pages.xml
  def create
    @page = current_user.pages.build(params[:page])

    respond_to do |format|
      if @page.save
        format.html { redirect_to(pages_url, :notice => 'Page was successfully created.') }
        format.xml  { render :xml => @page, :status => :created, :location => @page }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /pages/1
  # PUT /pages/1.xml
  def update
    @page = current_user.pages.find(params[:id])

    respond_to do |format|
      if @page.update_attributes(params[:page])
        format.html { redirect_to(@page, :notice => 'Page was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @page.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.xml
  def destroy
    @page = current_user.pages.find(params[:id])
    @page.destroy

    respond_to do |format|
      format.html { redirect_to(pages_url) }
      format.xml  { head :ok }
    end
  end
end
