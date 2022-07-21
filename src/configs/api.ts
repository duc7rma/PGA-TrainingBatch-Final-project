import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  product,
  user,
  admin,
  category,
  vendor,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.product) {
    return `${APIHost}/apiAdmin/products`;
  } else if (service === APIService.user) {
    return `${APIHost}/apiAdmin/users`;
  } else if (service === APIService.admin) {
    return `${APIHost}/apiAdmin`;
  } else if (service === APIService.category) {
    return `${APIHost}/api/categories`;
  } else if (service === APIService.vendor) {
    return `${APIHost}/apiVendor`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,

  usersList: `${getBaseUrl(APIService.user)}/list`,
  usersCreate: `${getBaseUrl(APIService.user)}/create`,
  usersEdit: `${getBaseUrl(APIService.user)}/edit`,


  productsList: `${getBaseUrl(APIService.product)}/list`,
  productsDetail: `${getBaseUrl(APIService.product)}/detail`,
  productsCreate: `${getBaseUrl(APIService.product)}/create`,
  productsEdit: `${getBaseUrl(APIService.product)}/edit`,

  brandsList: `${getBaseUrl(APIService.admin)}/brands/list`,
  vendorsList: `${getBaseUrl(APIService.admin)}/vendors/list`,
  countriesList: `${getBaseUrl(APIService.admin)}/commons/country`,
  rolesList: `${getBaseUrl(APIService.admin)}/commons/role`,

  categoriesList: `${getBaseUrl(APIService.category)}/list`,

  profileDetail: `${getBaseUrl(APIService.vendor)}/profile/detail`,





};
