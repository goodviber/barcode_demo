module Products
  module Services
    class CreateProductBarcode < Service
      Schema = Dry::Validation.Params do
        required(:user_id).filled(:int?)
        required(:product_id).filled(:int?)
        required(:body).filled(:str?)
      end

      attr_reader :product, :values

      def call(params)
        @values = yield validate(Schema, params)

        barcode = ProductBarcode.create!(
          product_id: values[:product_id],
          body: values[:body],
        )
        Success(barcode)
      end
    end
  end
end
