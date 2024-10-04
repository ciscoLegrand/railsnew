# frozen_string_literal: true

class FlagCommand < ViewComponent::Base
  attr_accessor :flag, :type, :checked, :target, :icon

  def initialize(flag:, type:, **options)
    super
    @flag = flag
    @type = type
    @checked = options[:checked].presence || false
    @target = options[:target]
    @icon = options[:icon]
  end
end
