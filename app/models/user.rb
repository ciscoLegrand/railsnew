class User < ApplicationRecord
  include UuidV7Generator

  has_secure_password
  has_many :sessions, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  before_create :set_slug

  private

  def set_slug
    self.slug = email_address.split("@").first.parameterize
  end
end
