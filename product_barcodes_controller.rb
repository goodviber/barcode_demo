module Products
  class ProductBarcodesController < BaseController
    def index
      barcodes = ProductBarcode
        .where(product_id: params[:product_id])
        .order(:created_at)
      render json: barcodes
    end

    def create
      Services::CreateProductBarcode.new.({
        user_id: current_user.id,
        product_id: params[:product_id],
        body: params[:body],
      }, &process_result_for_api)
    end

    def destroy
      Services::DestroyProductBarcode.new.({
        user_id: current_user.id,
        id: params[:id],
      }, &process_result_for_api)
    end
  end
end
