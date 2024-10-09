# frozen_string_literal: true

# This module is used to generate UUID v7 for the model
# To use this module, include it in the model
# Example:
# class User < ApplicationRecord
#   include UuidV7Generator
# end
#
# This will generate UUID v7 for the model
# This module is used to generate UUID v7 for the model
# To use this module, include it in the model
# Example:
# class User < ApplicationRecord
#   include UuidV7Generator
# end
#
# This will generate UUID v7 for the model
module UuidV7Generator
  extend ActiveSupport::Concern

  included do
    before_create :set_uuid_v7
  end

  private

  def set_uuid_v7
    self.id = SecureRandom.uuid_v7
  end
end
