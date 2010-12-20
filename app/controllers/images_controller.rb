class ImagesController < ApplicationController
  # GET /images
  # GET /images.xml
  def index
    @images = current_user.images.all
    
    @images_json = []
    @images.each do |image|
      @images_json.push({
        :id => image.id,
        :url => image.url
      })
    end
    
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @images_json, :callback => params[:callback] }
    end
  end

  # GET /images/1
  # GET /images/1.xml
  def show
    @image = current_user.images.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => @image, :callback => params[:callback] }
    end
  end

  # GET /images/new
  # GET /images/new.xml
  def new
    @image = current_user.images.build

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @image }
    end
  end

  # GET /images/1/edit
  def edit
    @image = current_user.images.find(params[:id])
  end

  # POST /images
  # POST /images.xml
  def create
    @image = current_user.images.build(params[:image])

    respond_to do |format|
      if @image.save
        format.html { redirect_to(images_url, :notice => 'Image was successfully created.') }
        format.xml  { render :xml => @image, :status => :created, :location => @image }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @image.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /images/1
  # PUT /images/1.xml
  def update
    @image = current_user.images.find(params[:id])

    respond_to do |format|
      if @image.update_attributes(params[:image])
        format.html { redirect_to(@image, :notice => 'Image was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @image.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /images/1
  # DELETE /images/1.xml
  def destroy
    @image = current_user.images.find(params[:id])
    @image.destroy

    respond_to do |format|
      format.html { redirect_to(images_url) }
      format.xml  { head :ok }
    end
  end
end
