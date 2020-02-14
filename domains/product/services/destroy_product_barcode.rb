module Products
  module Services
    class DestroyProductBarcode < Service
      Schema = Dry::Validation.Params do
        required(:id).filled(:int?)
      end

      attr_reader :barcode, :values

      def call(params)
        @values = yield validate(Schema, params)
        @barcode = ProductBarcode.find values[:id]

        barcode.delete
        Success({})
      end
    end
  end
end
