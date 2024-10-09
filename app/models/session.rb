class Session < ApplicationRecord
  include UuidV7Generator

  has_secure_token
  belongs_to :user
end
