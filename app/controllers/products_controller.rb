class ProductsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response


    def index
        product = Product.all
        render json: product
    end

    def show
        product = Product.find(params[:id])
        render json: product
    end

    def create
        product = Product.create!(product_params)
        render json: product, status: :created
    end

    def update
        product = Product.find(params[:id])
        product.update!(product_params)
        render json: product
    end

    def destroy
        product = Product.find(params[:id])
        product.destroy
        head :no_content
    end

    private

    def product_params
        params.permit(:name, :price, :description)
    end

    def render_not_found_response
        render json: { error: "Item not found" }, status: :not_found
    end
    
    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

end
