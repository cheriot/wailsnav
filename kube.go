package main

import (
	"context"

	"github.com/cheriot/kubenav/pkg/app"

	wailsruntime "github.com/wailsapp/wails/v2/pkg/runtime"
)

type Kube struct {
	ctx context.Context
}

// OnStarup is called at application startup
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

func (k *Kube) Describe(ctx string, ns string, kind string, name string) string {
	kubeCluster, err := app.GetOrMakeKubeCluster(k.ctx, ctx)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error getting cluster for name %s: %s", ctx, err.Error())
		return ""
	}

	describeStr, err := kubeCluster.Describe(k.ctx, ns, kind, name)
	if err != nil {
		wailsruntime.LogErrorf(k.ctx, "error describing %s %s %s %s: %+v", ctx, ns, kind, name, err)
		return ""
	}

	return describeStr
}
