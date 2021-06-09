function notFound(path: string) {
  return {
    status: 404,
    body: `${path} not found`,
  }
}

function internalServerError() {
  return {
    status: 500,
  }
}

function methodNotAllowed() {
  return {
    status: 405,
  }
}

export {
  notFound,
  internalServerError,
  methodNotAllowed,
} 