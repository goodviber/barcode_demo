module Products
  class ProductBarcode < ApplicationRecord
    belongs_to :product, class_name: "Products::Product"
  end
end
