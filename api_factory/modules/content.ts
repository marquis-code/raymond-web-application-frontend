import { GATEWAY_ENDPOINT } from "../axios.config"

export interface ContentType {
  HOME_HERO: "home_hero"
  PORTRAIT_HERO: "portrait_hero"
  GALLERY_HERO: "gallery_hero"
  SHOP_PRINTS_HERO: "shop_prints_hero"
  COMMISSION_HERO: "commission_hero"
  COMMISSION_INFO: "commission_info"
  CONTACT_INFO: "contact_info"
  ABOUT_SECTION: "about_section"
}

export const content_api = {
  $_get_content_by_type(type: string) {
    return GATEWAY_ENDPOINT.get(`/content/type/${type}`)
  }
}
