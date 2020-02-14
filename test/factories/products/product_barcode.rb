FactoryBot.define do
  factory :product_barcode, class: Products::ProductBarcode do
    product
    body { "this is the barcode body" }
  end
end
