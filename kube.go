package main

import (
	"context"
	"fmt"

	"github.com/cheriot/kubenav/pkg/app"

	wailsruntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type Kube struct {
	ctx context.Context
}

// OnStartup is called at application startup
func (k *Kube) OnStartup(ctx context.Context) {
	k.ctx = ctx
}

func (k *Kube) ContextList() []string {
	ctxList, err := app.KubeContextList()
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting ctx list: %s", err.Error())
		return []string{}
	}
	return ctxList
}

func (k *Kube) NamespaceList(ctxParam string) []string {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctxParam)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctxParam, err.Error())
		return []string{}
	}

	nsList, err := kubeCluster.KubeNamespaceList(k.ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting namespaces for cluster %s: %s", ctxParam, err.Error())
		return []string{}
	}
	return nsList
}

func (k *Kube) ResourceList(ctx string, ns string, query string) []app.ResourceTable {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctx, err.Error())
		return []app.ResourceTable{}
	}

	resourceTables, err := kubeCluster.Query(k.ctx, ns, query)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error during query for %s %s %s: %s", ctx, ns, query, err.Error())
		// return the tables. Maybe the error is for only one of them.
	}
	return resourceTables
}

func (k *Kube) Resource(ctx string, ns string, kind string, name string) app.KubeObject {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctx, err.Error())
		return app.KubeObject{
			Errors: []error{fmt.Errorf("error getting cluster for name %s: %w", ctx, err)},
		}
	}

	ko, err := kubeCluster.GetResource(k.ctx, ns, kind, name)
	if err != nil {
		return app.KubeObject{
			Errors: []error{fmt.Errorf("unable to GetResource %s %s %s %s: %w", ctx, ns, kind, name, err)},
		}
	}

	wailsruntime.LogErrorf(k.ctx, "KubeObject %+v\n", *ko)
	fmt.Printf("KubeObject %+v\n", *ko)

	return *ko
}

func (k *Kube) Command(ctx string, ns string, query string, cmd string) app.CommandResult {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctx, err.Error())
		return app.ErrorCommandResult("error getting cluster context")
	}

	r := kubeCluster.Command(k.ctx, ns, query, cmd)
	wailsruntime.LogInfof(k.ctx, "command '%s': %+v", cmd, r)
	return r
}
