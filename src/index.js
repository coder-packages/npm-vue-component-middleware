function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]

  if (!nextMiddleware) {
    return context.next
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1)

    nextMiddleware({...context, next: nextPipeline})
  }
}

module.exports = function ({router, store}) {
  router.beforeEach((to, from, next) => {
    let middleware = to.matched.map((matched) => {
      return matched.components.default.middleware
    })
      .filter((middleware) => middleware !== undefined)
      .flat()

    if (!middleware.length && !to.meta.middleware) {
      return next()
    }

    if (!middleware.length) {
      middleware = to.meta.middleware
    }

    const context = {
      to,
      from,
      next,
      router,
      store
    }

    return middleware[0]({...context, next: middlewarePipeline(context, middleware, 1)})
  })
}
